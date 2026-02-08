export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} Ukiyo. All rights reserved.
      </div>
    </footer>
  );
}
