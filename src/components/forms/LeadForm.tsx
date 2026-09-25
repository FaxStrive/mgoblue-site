"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { facts } from "@/lib/facts";
import { hasConfiguredEndpoint, submitLead } from "@/lib/submitLead";

type Errors = {
  name?: string;
  contact?: string;
  message?: string;
};

export default function LeadForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "not-configured" | "network-error">("idle");

  function validate(): Errors {
    const next: Errors = {};

    if (name.trim().length === 0) {
      next.name = "Enter a name.";
    }

    if (phone.trim().length === 0 && email.trim().length === 0) {
      next.contact = "Enter a phone number or an email address.";
    }

    if (message.trim().length === 0) {
      next.message = "Say what you need help with.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!hasConfiguredEndpoint()) {
      setStatus("not-configured");
      return;
    }

    setStatus("submitting");

    const result = await submitLead({ name, phone, email, message });

    if (result.ok) {
      router.push("/thank-you");
      return;
    }

    setStatus(result.reason);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
        {errors.name ? <p className="text-sm text-red-600">{errors.name}</p> : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
        {errors.contact ? <p className="text-sm text-red-600">{errors.contact}</p> : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium">
          What do you need help with
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          className="border border-gray-400 px-3 py-2 rounded-none"
        />
        {errors.message ? <p className="text-sm text-red-600">{errors.message}</p> : null}
      </div>

      {status === "not-configured" ? (
        <p className="text-sm text-red-700" role="alert">
          This form is not connected to anything yet. Your details were not
          sent or received.{" "}
          {facts.phone
            ? `Call ${facts.phone} instead.`
            : "Call the number shown on this page instead, once it is set."}
        </p>
      ) : null}

      {status === "network-error" ? (
        <p className="text-sm text-red-700" role="alert">
          The submission failed and your details were not received. Try
          again, or call {facts.phone ?? "the number shown on this page"}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-none bg-brand text-brand-foreground px-6 py-3 font-semibold disabled:opacity-60"
      >
        {status === "submitting" ? "Sending" : "Send"}
      </button>
    </form>
  );
}
