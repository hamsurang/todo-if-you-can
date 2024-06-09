import { AddIcon } from "@chakra-ui/icons";
import { IconButton, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRidiculeSound } from "../hooks/useRidiculeSound";

const positions = [
  { top: "24px", right: "24px", bottom: "auto", left: "auto" },
  { top: "auto", right: "auto", bottom: "24px", left: "24px" },
  { top: "auto", right: "24px", bottom: "24px", left: "auto" },
  { top: "24px", right: "auto", bottom: "auto", left: "24px" },
];

interface AddButtonProps {
  onClick: () => void;
}
export function AddButton({ onClick }: AddButtonProps) {
  const { play: playRidiculeSound } = useRidiculeSound();

  const toast = useToast();
  const [positionIndex, setPositionIndex] = useState(0);

  function 놀리기() {
    playRidiculeSound();
    toast({
      title: "조금만 더 참고 눌러봐요",
      status: "info",
    });
  }

  const handleClick = () => {
    const 버튼만_움직이기 = Math.random() > 0.2;
    if (버튼만_움직이기) {
      놀리기();
      setPositionIndex((prevIndex) => (prevIndex + 1) % positions.length);
      return;
    }

    onClick();
  };
  return (
    <motion.div
      animate={positions[positionIndex]}
      style={{
        position: "absolute",
        width: "48px",
        height: "48px",
      }}
    >
      <IconButton
        icon={<AddIcon w={8} h={8} />}
        aria-label="Add"
        onClick={handleClick}
        size="lg"
        isRound
        style={{
          width: "48px",
          height: "48px",
        }}
      />
    </motion.div>
  );
}
