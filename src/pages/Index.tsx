import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkle from "@/components/Sparkle";
import BlowCandles from "@/components/BlowCandles";
import { Cake, Star, PartyPopper, Mail, MailOpen } from "lucide-react";

const Index = () => {
  const [step, setStep] = useState<"envelope" | "candles" | "message">("envelope");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <FloatingHearts />
      <Sparkle />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <AnimatePresence mode="wait">
          {step === "envelope" && (
            <EnvelopeScreen onOpen={() => setStep("candles")} />
          )}
          {step === "candles" && (
            <BlowCandles onComplete={() => setStep("message")} />
          )}
          {step === "message" && <BirthdayMessage />}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── Envelope Screen ── */
const EnvelopeScreen = ({ onOpen }: { onOpen: () => void }) => (
  <motion.div
    key="envelope"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, y: -60 }}
    transition={{ duration: 0.6, ease: "easeOut" as const }}
    className="flex flex-col items-center gap-8 cursor-pointer select-none"
    onClick={onOpen}
  >
    {/* Envelope icon with bounce */}
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl bg-card border-2 border-border shadow-2xl flex items-center justify-center">
        <Mail className="w-20 h-20 md:w-28 md:h-28 text-primary" />
      </div>

      {/* Seal */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
      >
        <p className="w-5 h-5 font-bold text-cyan-50 size-8 flex justify-center items-center">20+</p> 
      </motion.div>
    </motion.div>

    <div className="text-center">
      <p className="font-script text-3xl md:text-4xl text-primary mb-2">
        You've got a message!
      </p>
      <p className="font-script text-xl md:text-xl text-primary mb-2">
      from khulan
      </p>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-muted-foreground tracking-widest uppercase"
      >
        Tap to open
      </motion.p>
    </div>
  </motion.div>
);

/* ── Birthday Message ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" as const },
  }),
};

const BirthdayMessage = () => {
  // Play celebration sound on mount
  useEffect(() => {
    const celebrationSound = new Audio('/wish2.mp3'); 
    celebrationSound.volume = 0.6;
    celebrationSound.play().catch(() => {});
  }, []);

  return (
    <motion.div
      key="message"
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        type: "spring",
        bounce: 0.6,
        stiffness: 200,
        damping: 12,
      }}
      className="flex flex-col items-center"
    >
      {/* Explosion particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              scale: 0,
              x: "50vw",
              y: "50vh",
            }}
            animate={{
              opacity: 0,
              scale: [0, 1.5, 0.5],
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            transition={{
              duration: 1.5 + Math.random(),
              delay: Math.random() * 0.3,
              ease: "easeOut",
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: [
                "hsl(var(--primary))",
                "hsl(var(--gold))",
                "hsl(var(--rose-glow))",
                "hsl(var(--accent))",
                "hsl(var(--secondary))",
              ][i % 5],
            }}
          />
        ))}
      </div>

      {/* Big flash overlay */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 bg-primary/20 pointer-events-none z-40"
      />

      {/* Opened envelope icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.5 }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center shadow-lg overflow-hidden">
          <img src="https://ih1.redbubble.net/image.3494792996.2576/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="logo" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Date badge */}
      <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase">
          <PartyPopper className="w-4 h-4" />
          March 6th
          <PartyPopper className="w-4 h-4" />
        </span>
      </motion.div>

      {/* Heading with scale bounce */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.3, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.5 }}
        className="font-script text-5xl sm:text-6xl md:text-8xl text-primary text-center leading-tight mb-2"
      >
        Happy 20th
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring", bounce: 0.5 }}
        className="font-script text-3xl sm:text-4xl md:text-5xl text-gold text-center mb-8"
      >
        Birthday!
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "auto" }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="flex items-center gap-3 mb-10 overflow-hidden"
      >
        <Star className="w-4 h-4 text-gold" />
        <Mail className="w-5 h-5 text-primary" />
        <div className="w-16 h-1.5 bg-border rounded-full" />
        <Cake className="w-6 h-6 text-rose-glow" />
        <div className="w-16 h-1.5 bg-border rounded-full" />
        <MailOpen className="w-5 h-5 text-primary" />
        <Star className="w-4 h-4 text-gold" />
      </motion.div>

      {/* Message card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.7, type: "spring", bounce: 0.3 }}
        className="max-w-lg w-full"
      >
        <div className="rounded-2xl bg-card border border-border p-8 md:p-10 shadow-xl backdrop-blur-sm">
          
        <p className="text-base md:text-lg font-paragraph italic leading-relaxed text-muted-foreground text-center mb-6">
        Heyy🎉
        </p>

          <p className="text-base md:text-lg font-paragraph italic leading-relaxed text-muted-foreground text-center mb-6">
          It’s been a while since we’ve seen each other — I might be starting to forget your face a little 😂  but somehow 
          I never forget your birthday.  
          </p>

          <p className="text-base md:text-lg font-paragraph italic leading-relaxed text-muted-foreground text-center mb-6">
          Anyway, I just wanted to say I hope this new decade brings you the courage to try anything you want. It’s okay to 
          make mistakes — we’re still young, and that’s how we learn about the world and about ourselves. Be brave, take risks, 
          and trust that there are people who genuinely care about you and are quietly cheering for you. Yes, I’m included.  
          </p>

          <p className="text-base md:text-lg font-paragraph italic leading-relaxed text-muted-foreground text-center mb-6">
          I don’t usually go around saying “I like this or that about you,” but today’s special and you might just deserve a 
          little extra kindness from me… your sense of humor has always been funny in the best ways. And let’s be honest, 
          that smile of yours is still dangerously good. You better keep it and not show it to every random girl you meet — 
          haha, of course I’m joking. But really, I hope you know what a charming person you are.😉
          </p>

          <p className="text-base md:text-lg font-paragraph italic leading-relaxed text-muted-foreground text-center mb-6">
          And I’m writing this in English because if I said all of this in Mongolian, it would sound way too serious and lose 
          its funny 😂 I probably wouldn’t even find the right words to express what I mean.  
          </p>

          <p className="text-base md:text-lg font-paragraph italic leading-relaxed text-muted-foreground text-center mb-6">
          So yeah… I just hope you live your 20s fully — feel everything, learn from everything, and grow into the best 
          version of yourself.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-accent" />
            <Star className="w-4 h-4 text-gold" />
            <div className="h-px w-12 bg-accent" />
          </div>

          <p className="font-script text-2xl md:text-3xl text-primary text-center">
          Cheers to all your wishes coming true          </p>
          <p className="font-script text-xl md:text-2xl text-brown text-end mt-1">
          ~ Kh ~
          </p>
        </div>
      </motion.div>

      {/* Bouncing emojis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-10 flex items-center gap-4"
      >
        {["🎊", "✨", "🥂", "✨", "🎊"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-2xl md:text-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Index;
