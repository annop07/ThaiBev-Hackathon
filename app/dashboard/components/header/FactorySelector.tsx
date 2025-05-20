import { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Factory, groupedFactories } from "@/types/factory";
import { Check, ChevronsUpDown, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface FactorySelectorProps {
    selectedFactory: Factory | null;
    onFactoryChange: (factoryId: string) => void;
}

export function FactorySelector({ selectedFactory, onFactoryChange }: FactorySelectorProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-2">
            <Warehouse className="h-5 w-5 text-blue-600" />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[300px] justify-between"
                    >
                        {selectedFactory ? (
                            <div className="flex items-center gap-2 truncate">
                                <span>{selectedFactory.name}</span>
                                <Badge variant="outline" className="ml-2">
                                    {selectedFactory.region}
                                </Badge>
                            </div>
                        ) : (
                            "เลือกโรงงาน..."
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="ค้นหาโรงงาน..." />
                        <CommandEmpty>ไม่พบโรงงานที่ค้นหา</CommandEmpty>
                        <ScrollArea className="h-[300px]">
                            {Object.entries(groupedFactories).map(([region, factories]) => (
                                <CommandGroup key={region} heading={region}>
                                    {factories.map((factory) => (
                                        <CommandItem
                                            key={factory.id}
                                            value={`${factory.name} ${factory.province} ${factory.code}`}
                                            onSelect={() => {
                                                onFactoryChange(factory.id.toString());
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedFactory?.id === factory.id
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            <div className="flex flex-col">
                                                <span>{factory.name}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {factory.province} ({factory.code})
                                                </span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </ScrollArea>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}