import { TerminalBlock } from "@/components/templates/terminal-block";

interface InstallCommandProps {
  slug: string;
}

export function InstallCommand({ slug }: InstallCommandProps) {
  const command = `git clone --filter=blob:none --sparse https://github.com/cabinetai/cabinets.git && cd cabinets && git sparse-checkout set ${slug}`;

  return (
    <div>
      <TerminalBlock command={command} label="Install" />
    </div>
  );
}
