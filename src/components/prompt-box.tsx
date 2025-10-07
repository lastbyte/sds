import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Code2Icon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function PromptBox() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      "Design a URL shortening service like bit.ly"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          disabled
          defaultValue="Design a URL shortening service like bit.ly"
          className="min-h-[200px]"
        />
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <Code2Icon />
            prompt
          </InputGroupText>
          <InputGroupButton className="ml-auto cursor-pointer gap-2 flex flex-row" onClick={handleCopy}>
              {copied && <span className="text-sm text-green-500"> copied </span>}
              <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
