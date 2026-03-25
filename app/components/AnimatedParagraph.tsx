'use client';
import { motion, Variants } from 'framer-motion';

const lineReveal: Variants = {
  initial: { y: '110%', opacity: 0 },
  open: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.07 * i,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

interface Props {
  lines: string[];
  isInView: boolean;
  style?: React.CSSProperties;
}

export default function AnimatedParagraph({ lines, isInView, style = {} }: Props) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13.5px",
        fontWeight: 300,
        color: "var(--fg-muted)",
        lineHeight: 1.8,
        maxWidth: "340px",
        margin: 0,
        padding: 0,
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: "block", overflow: "hidden", lineHeight: 1.8, paddingBottom: "0.04em" }}
        >
          <motion.span
            variants={lineReveal}
            custom={i}
            animate={isInView ? 'open' : 'initial'}
            initial="initial"
            style={{ display: "block" }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </p>
  );
}