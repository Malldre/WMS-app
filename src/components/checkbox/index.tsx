import { Checkbox, CheckboxIndicator, CheckboxIcon, Text } from '@gluestack-ui/themed'
import { CheckIcon } from 'lucide-react-native'

type CheckboxProps = {
  label: string;
  value: string;
}

export const CheckBoxComponent = ({ label, value }: CheckboxProps) => {
  return (
    <Checkbox value={value}>
      <CheckboxIndicator>
        <CheckboxIcon as={CheckIcon} color='$white' />
      </CheckboxIndicator>
      <Text ml="$2">{label}</Text>
    </Checkbox>
  )
}
