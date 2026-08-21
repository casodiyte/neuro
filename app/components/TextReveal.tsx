export function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");

  return (
    <span className="text-reveal-wrapper" aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="text-reveal-word"
          style={{ animationDelay: `${delay + index * 0.055}s` }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
