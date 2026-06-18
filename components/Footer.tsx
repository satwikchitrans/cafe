'use client';

const WHATSAPP_URL = 'https://wa.me/918580364890?text=Hi%20CHEMIKAZE%2C%20I%27d%20like%20to%20discuss%20a%20project.';

export default function Footer() {
  return (
    <footer className="bg-ink text-stone">
      <div className="container-wide py-12">
        <div className="h-px bg-graphite/20 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <span className="label text-ivory tracking-[0.3em] block mb-4">CHEMIKAZE</span>
            <p className="text-sm text-graphite font-serif italic">
              Engineering Growth. Automating Success.
            </p>
          </div>

          {/* Contact */}
          <div>
            <span className="label text-graphite block mb-4">Contact</span>
            <div className="space-y-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone hover:text-gold transition-colors duration-300 block"
              >
                WhatsApp: +91 8580364890
              </a>
              <a
                href="mailto:2500520510058@ietlucknow.ac.in"
                className="text-sm text-stone hover:text-gold transition-colors duration-300 block"
              >
                2500520510058@ietlucknow.ac.in
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <span className="label text-graphite block mb-4">Connect</span>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'Instagram'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm text-stone hover:text-gold transition-colors duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-graphite/20">
          <p className="text-xs text-graphite text-center md:text-left">
            &copy; {new Date().getFullYear()} CHEMIKAZE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
