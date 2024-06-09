import {
  Button,
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
import { useSessionStorage } from "usehooks-ts";

export function useUploadModal() {
  const overlay = useOverlay();

  const open = useCallback(() => {
    overlay.open((_overlay) => {
      return <UploadModal isOpen={_overlay.isOpen} onClose={_overlay.close} />;
    });
  }, [overlay]);

  return useMemo(() => ({ open }), [open]);
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const toast = useToast();
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useSessionStorage<string[]>("킹받두", []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>투두를 적어주세요</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              toast({
                title: "투두가 왜 저장되지 않았을까요?",
              });
              onClose();
            }}
          >
            저장
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setTodoList([...todoList, input]);
              onClose();
            }}
          >
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
