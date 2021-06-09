import { Edit, SimpleForm, TextInput, required, ReferenceInput, SelectInput } from 'react-admin'
import DateTimeInput from 'components/DateTimeInput'
import LocationInput from 'components/LocationInput'

const SessionEdit = (props) => (
  <Edit {...props} title="Edytuj sesję">
    <SimpleForm>
      <TextInput source="name" />
      <DateTimeInput source="begins_at" validate={[required()]} />
      <DateTimeInput source="ends_at" />
      <ReferenceInput label="mówca" source="speaker_id" reference="speaker" resettable>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <LocationInput />
    </SimpleForm>
  </Edit>
)

export default SessionEdit
