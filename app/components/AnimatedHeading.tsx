'use client';
import { CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';

const slideUp: Variants = {
  initial: { y: '105%' },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.7, delay: 0.012 * i, ease: [0.76, 0, 0.24, 1] },
  }),
  closed: { y: '105%', transition: { duration: 0.5 } },
};

interface Props {
  text: string;
  isInView: boolean;
  italicLine?: number;
  italicStyle?: CSSProperties;
  style?: CSSProperties;
}

export default function AnimatedHeading({ text, isInView, italicLine, italicStyle = {}, style = {} }: Props) {
  let globalIndex = 0;

  return (
    <h2
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
        fontWeight: 400,
        lineHeight: 1.02,
        letterSpacing: "-0.025em",
        color: "var(--fg)",
        margin: 0,
        padding: 0,
        ...style,
      }}
    >
      {text.split('\n').map((line, li) => {
        const isItalic = li === italicLine;
        return (
          <span
            key={li}
            style={{
              display: "block",
              ...(isItalic ? italicStyle : {}),
            }}
          >
            {line.split(' ').map((word) => {
              const i = globalIndex++;
              return (
                <span
                  key={i}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    overflow: "hidden",
                    // Add a tiny bit of vertical padding so descenders aren't clipped
                    paddingBottom: "0.06em",
                    marginRight: "0.22em",
                  }}
                >
                  <motion.span
                    variants={slideUp}
                    custom={i}
                    animate={isInView ? 'open' : 'closed'}
                    initial="initial"
                    style={{ display: "inline-block" }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}