import { HStack, Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Funnel, Search, SearchIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';

export default function FilterByStatusAndName() {
  return (
    <HStack w='$full' alignItems='center' justifyContent='space-between'>
      <Input
        w='$64'
        variant="rounded"
        size="md"
        bg='$white'
        borderWidth={1}
        borderColor='$primary900'
      >
        <InputField color='$primary900' placeholder="Search..." />
        <InputSlot pr="$3">
          <Search
            size='18px'
            color='#0F0F1A'
            strokeWidth='3px'
          />
        </InputSlot>
      </Input>
      <Pressable>
        <Funnel
          size='32px'
          color='#0F0F1A'
        />
      </Pressable>
    </HStack>
  )
}
