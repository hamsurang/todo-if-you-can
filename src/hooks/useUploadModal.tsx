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
import { TodoItemType } from "../constant";
import { delay } from "../utils/delay";

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
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useSessionStorage<TodoItemType[]>(
    "킹받두",
    [],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        css={{
          marginLeft: "24px",
          marginRight: "24px",
        }}
      >
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
            isLoading={isLoading}
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              setIsLoading(true);
              await delay(2_000);
              toast({
                title: "로딩 구라임 ㅋㅋ그냥 좀 기다리셈ㅋ",
                containerStyle: {
                  marginBottom: "128px",
                },
              });

              await delay(2_000);

              toast({
                title: "저장 누른다고 저장이 될까요?",
                status: "error",
                containerStyle: {
                  marginBottom: "24px",
                },
              });
              onClose();
            }}
          >
            저장
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (input === "") {
                toast({
                  title: "왜 그냥 닫아? 지킬 자신이 없어요?",

                  containerStyle: {
                    marginBottom: "24px",
                  },
                });
                onClose();
                return;
              }
              setTodoList([
                ...todoList,
                { id: Date.now(), text: input, done: false },
              ]);
              toast({
                title: "취소 눌러야 저장됌ㅋ",

                containerStyle: {
                  marginBottom: "24px",
                },
              });
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
