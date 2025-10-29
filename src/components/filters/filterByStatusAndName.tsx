import { FiltersSheet } from '@/src/features/tasks/components/FiltersSheet';
import { CardTasksStatusEnum } from '@/src/types/tasks';
import { HStack, Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Funnel, Search, SearchIcon } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import { Pressable } from 'react-native';

export default function FilterByStatusAndName() {

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<CardTasksStatusEnum[]>([]); // estado externo

  // exemplo: lista filtrada (substitua pela sua query/flatlist)
  const filtered = useMemo(() => {
    // se selected estiver vazio, retorna tudo
    // aqui você aplicaria no seu react-query / chamada de API
    return selected;
  }, [selected]);

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

      <Pressable onPress={() => setFiltersOpen(true)}>
        <Funnel
          size='32px'
          color='#0F0F1A'
        />
      </Pressable>

      <FiltersSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        initial={selected}
        onApply={(next) => setSelected(next)}
        onClear={() => setSelected([])}
      />
    </HStack>
  )
}
