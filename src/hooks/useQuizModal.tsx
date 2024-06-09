import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useOverlay } from "@toss/use-overlay";
import { useCallback, useMemo, useState } from "react";

export function useQuizModal() {
  const overlay = useOverlay();

  const open = useCallback(() => {
    return new Promise<boolean>((resolve) =>
      overlay.open((_overlay) => {
        return (
          <QuizModal
            isOpen={_overlay.isOpen}
            onClose={_overlay.close}
            onCorrect={() => {
              resolve(true);
              _overlay.close();
            }}
            onWrong={() => {
              resolve(false);
            }}
          />
        );
      }),
    );
  }, [overlay]);

  return useMemo(() => ({ open }), [open]);
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrect: () => void;
  onWrong: () => void;
}

export function QuizModal({
  isOpen,
  onClose,
  onCorrect,
  onWrong,
}: UploadModalProps) {
  const toast = useToast();
  const num1 = useMemo(() => Math.floor(Math.random() * 13213), []);
  const num2 = useMemo(() => Math.floor(Math.random() * 12334), []);
  const [userAnswer, setUserAnswer] = useState<string>("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        css={{
          marginLeft: "24px",
          marginRight: "24px",
        }}
      >
        <ModalHeader>체크하려면 이거 맞춰야댐</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card>
            {num1} + {num2} = ?
          </Card>
          <Input
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              const correctAnswer = num1 + num2;
              if (parseInt(userAnswer) === correctAnswer) {
                onCorrect();
              } else {
                toast({
                  title: "풉 ㅋ",
                  status: "error",
                });
                onWrong();
              }
            }}
          >
            정답 제출하고 투두 체크하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
