import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Code2Icon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

export function PromptBox() {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      "Design a URL shortening service like bit.ly"
    );
    toast("Prompt copied to clipboard");
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
          <InputGroupButton className="ml-auto cursor-pointer" size="icon-xs">
            <CopyIcon onClick={handleCopy} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
