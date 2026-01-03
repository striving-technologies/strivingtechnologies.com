import { ArrowIcon } from "@/icons";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { InteractiveLink } from "../shared";

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const phoneRegex =
    /^(\+\d{1,3}\s?)?[\s.-]?\(?\d{3,4}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "phone") {
      phoneRef.current?.setCustomValidity("");
    }
    if (e.target.name === "email") {
      emailRef.current?.setCustomValidity("");
    }
  };

  const validateFormValues = () => {
    if (form.phone.length > 0) {
      if (!phoneRegex.test(form.phone)) {
        phoneRef.current?.setCustomValidity("Phone number wrongly formatted.");
        return false;
      } else {
        phoneRef.current?.setCustomValidity("");
      }
    }
    if (form.email.length > 0) {
      if (!emailRegex.test(form.email)) {
        emailRef.current?.setCustomValidity("Email wrongly formatted.");
        return false;
      } else {
        emailRef.current?.setCustomValidity("");
      }
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFormValues()) return;

    try {
      setSubmitting(true);
      setErrorMessage(""); // Clear any previous error message

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Response status: ${response.status}`);
      }

      setIsSuccessful(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => {
        setIsSuccessful(false);
      }, 5000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-8 max-w-2xl"
      onSubmit={handleSubmit}
    >
      <input
        className="input-default"
        name="name"
        placeholder="Full Name"
        required
        value={form.name}
        onChange={handleChange}
      />
      <div className="flex gap-4 phone:flex-col phone:gap-8">
        <input
          className="input-default"
          name="email"
          placeholder="E-mail"
          required
          ref={emailRef}
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="input-default"
          name="phone"
          placeholder="Phone number"
          type="tel"
          ref={phoneRef}
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <textarea
        className="input-default"
        name="message"
        placeholder="Message"
        required
        rows={4}
        value={form.message}
        onChange={handleChange}
      />
      <InteractiveLink>
        <button
          className="input-default !w-min whitespace-nowrap flex items-center gap-4 !rounded-full phone:!w-full phone:justify-between hover:bg-primary hover:text-black focus:border-white"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Let's connect"}
          <ArrowIcon className="h-4 w-auto" />
        </button>
      </InteractiveLink>
      {isSuccessful && (
        <p className="text-green-100 text-sm">
          We've gotten your message. We'll get back to you soon!
        </p>
      )}
      {errorMessage && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}
    </form>
  );
};
