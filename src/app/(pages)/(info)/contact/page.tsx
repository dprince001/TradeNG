"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import InfoPageHero from "@/app/components/layout/InfoPageHero";
import { PageTransition } from "@/app/components/Motion";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import usePost from "@/app/hooks/usePost";
import { useContactSupportMutation } from "@/app/redux/api/supportApiSlice";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Give your message a subject"),
  message: z.string().min(10, "Tell us a bit more (10+ characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const { handlePost, isLoading } = usePost(useContactSupportMutation);

  const onSubmit = async (values: ContactFormValues) => {
    const response = await handlePost(values);
    if (response?.success !== false) {
      methods.reset();
    }
  };

  return (
    <AppShell>
      <InfoPageHero
        eyebrow="Get in touch"
        title="We're here to help"
        subtitle="Questions about an order, a dispute, or your account — send us a message and our team will get back to you."
      />

      <Container className="py-12 md:py-16 max-w-xl">
        <PageTransition>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-4"
            >
              <FormInput name="name" label="Full name" placeholder="Your name" />
              <FormInput name="email" label="Email address" placeholder="you@example.com" />
              <FormInput name="subject" label="Subject" placeholder="What's this about?" />
              <FormInput
                name="message"
                label="Message"
                type="textarea"
                placeholder="Tell us more..."
              />
              <Button type="submit" fullWidth loading={isLoading} className="mt-2">
                Send message
              </Button>
            </form>
          </FormProvider>
        </PageTransition>
      </Container>
    </AppShell>
  );
};

export default ContactPage;
