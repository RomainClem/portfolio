export function DashedLink({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="italic font-medium underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
    >
      {name}
    </a>
  );
}
