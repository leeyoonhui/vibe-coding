import { MailIcon, PhoneIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Profile } from "@/types";
import { ContactForm } from "./ContactForm";

function ContactLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex min-h-11 items-center gap-3 text-base text-fg transition-colors hover:text-accent md:text-lg">
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-accent">{icon}</span>
      {children}
    </a>
  );
}

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pt-14 pb-[72px] md:pt-24 md:pb-[120px]">
      <Reveal className="flex flex-col items-center gap-10 md:gap-14">
        <SectionTitle id="contact-title">Get in touch</SectionTitle>
        <div className="flex flex-col items-center gap-x-12 gap-y-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <ContactLink href={`tel:${profile.phone}`} icon={<PhoneIcon size={20} />}>
            {profile.phone}
          </ContactLink>
          <ContactLink href={`mailto:${profile.email}`} icon={<MailIcon size={20} />}>
            {profile.email}
          </ContactLink>
        </div>
        <ContactForm />
      </Reveal>
    </section>
  );
}
