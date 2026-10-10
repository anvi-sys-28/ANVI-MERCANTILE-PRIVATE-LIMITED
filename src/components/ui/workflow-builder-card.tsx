import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface User {
  src: string;
  fallback: string;
}

interface Action {
  Icon: React.ElementType;
  bgColor: string;
}

export interface WorkflowBuilderCardProps {
  imageUrl: string;
  status: "Active" | "Inactive";
  lastUpdated: string;
  title: string;
  description: string;
  tags: string[];
  users: User[];
  actions: Action[];
  className?: string;
  onClick?: () => void;
}

export const WorkflowBuilderCard = ({
  imageUrl,
  status,
  lastUpdated,
  title,
  description,
  tags,
  users,
  actions,
  className,
  onClick,
}: WorkflowBuilderCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Animation variants for the details section
  const detailVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "1rem",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className={cn("w-full max-w-sm cursor-pointer", className)}
    >
      <Card className="overflow-hidden rounded-2xl shadow-2xl transition-shadow duration-300 hover:shadow-2xl bg-[#0a2540]/90 backdrop-blur-xl border border-white/20 text-white">
        {/* Card Image */}
        <div className="relative h-36 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540] via-black/20 to-transparent"></div>
        </div>

        <div className="p-4">
          {/* Always-visible header content */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span>{lastUpdated}</span>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      status === "Active" ? "bg-emerald-400" : "bg-red-400"
                    )}
                    aria-label={status}
                  />
                  <span>{status}</span>
                </div>
              </div>
              <h3 className="mt-1 text-base font-extrabold text-white font-headline tracking-tight">
                {title}
              </h3>
            </div>
            <button
              aria-label="More options"
              className="text-white/60 transition-colors hover:text-white"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Animated description and tags section */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="details"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={detailVariants}
                className="overflow-hidden"
              >
                <p className="text-xs text-white/80 leading-relaxed font-sans">{description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} className="bg-[#f39c12] text-[#0a2540] font-bold text-[10px] border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between border-t border-white/10 p-4">
          <div className="flex -space-x-2">
            {users.map((user, index) => (
              <Avatar
                key={index}
                className="h-7 w-7 border-2 border-[#0a2540]"
                aria-label={user.fallback}
              >
                <AvatarImage src={user.src} />
                <AvatarFallback className="bg-[#f39c12] text-[#0a2540] text-[10px] font-bold">{user.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center -space-x-2">
            {actions.map(({ Icon, bgColor }, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0a2540] text-white shadow",
                  bgColor
                )}
              >
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
