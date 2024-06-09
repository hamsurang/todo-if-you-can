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

export function useEditModal({id, text}: Omit<TodoItemType, 'done'>) {
  const overlay = useOverlay();

  const open = useCallback(() => {
    overlay.open((_overlay) => {
      return <UploadModal isOpen={_overlay.isOpen} onClose={_overlay.close}  id={id} text={text}/>;
    });
  }, [overlay, id, text]);

  return useMemo(() => ({ open }), [open]);
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  text: string;
}

export function UploadModal({ isOpen, onClose, id, text }: UploadModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [input, setInput] = useState(text);
  const [todoList, setTodoList] = useSessionStorage<TodoItemType[]>(
    "킹받두",
    [],
  );

  const handleCancel = () => {
    if (input === "") {
      toast({
        title: "왜 그냥 닫아? 수정할 자신이 없어요?",
        containerStyle: {
          marginBottom: "24px",
        },
      });
      onClose();
      return;
    }

    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, text: input } : todo
    );

    setTodoList(updatedTodoList);

    toast({
      title: "취소 눌러야 수정됌ㅋ",
      containerStyle: {
        marginBottom: "24px",
      },
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        css={{
          marginLeft: "24px",
          marginRight: "24px",
        }}
      >
        <ModalHeader>투두를 수정해주세요</ModalHeader>
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
                title: "수정 누른다고 수정이 될까요?",
                status: "error",
                containerStyle: {
                  marginBottom: "24px",
                },
              });
              onClose();
            }}
          >
            수정
          </Button>
          <Button
            variant="ghost"
            onClick={handleCancel}
          >
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
