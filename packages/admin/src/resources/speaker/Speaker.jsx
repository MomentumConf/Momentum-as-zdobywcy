import {
  List,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  Create,
  Edit,
  SelectInput,
  NumberInput,
  FunctionField,
} from 'react-admin'
// import moment from 'utils/moment'
// import DateTimeInput from 'components/DateTimeInput'
// import { DateTimeField } from 'components/fields'

const images = [
  { id: 'dominik-jaworski.png', name: 'dominik-jaworski.png' },
  { id: 'dominik-tomaszewski.png', name: 'dominik-tomaszewski.png' },
  { id: 'ewa-wasilewska-kaminska.png', name: 'ewa-wasilewska-kaminska.png' },
  { id: 'gosia-tomaszewska.png', name: 'gosia-tomaszewska.png' },
  { id: 'jarek-szkudelski.png', name: 'jarek-szkudelski.png' },
  { id: 'joanna-nikiel.png', name: 'joanna-nikiel.png' },
  { id: 'kuba-kusmider.png', name: 'kuba-kusmider.png' },
  { id: 'kuba-kuzynin.png', name: 'kuba-kuzynin.png' },
  { id: 'marek-kaminski.png', name: 'marek-kaminski.png' },
  { id: 'marek-sobotka.png', name: 'marek-sobotka.png' },
  { id: 'paulina-kuzynin.png', name: 'paulina-kuzynin.png' },
  { id: 'piotr-karas.png', name: 'piotr-karas.png' },
  { id: 'weronika-kusmider.png', name: 'weronika-kusmider.png' },
  { id: 'wojciech-trybek.png', name: 'wojciech-trybek.png' },
  { id: 'zbyszek-zarozny.png', name: 'zbyszek-zarozny.png' },
]

export const SpeakerList = (props) => (
  <List
    {...props}
    // empty={<Empty />}
    title="Lista mówców"
    exporter={false}
    bulkActionButtons={false}
    // sort={{ field: 'published_at', order: 'DESC' }}
  >
    <Datagrid rowClick="show">
      {/* <DateTimeField source="created_at" format="dddd, D MMMM, HH:mm" withRelative /> */}
      <TextField source="name" emptyText="&mdash;" />
      {/* <TextField source="content" emptyText="&mdash;" /> */}
      <FunctionField
        label="opis"
        render={(record) => (
          <div
            style={{
              maxWidth: '42rem',
              wordWrap: 'break-word',
              maxHeight: '2.5rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '2',
            }}
          >
            {record['description']}
          </div>
        )}
      />
      {/* <DeleteButton undoable={false} /> */}
    </Datagrid>
  </List>
)

export const SpeakerCreate = (props) => (
  <Create {...props} title="Dodaj powiadomienie">
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <TextInput source="description" multiline />
      <SelectInput source="image" style={{ width: '256px' }} choices={images} resettable />
      <NumberInput
        label="priorytet"
        source="priority"
        helperText="Priorytet na liście, od najmniejszego, 0 - nie wyświetlaj"
      />
    </SimpleForm>
  </Create>
)

export const SpeakerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <TextInput source="description" multiline />
      <SelectInput source="image" style={{ width: '256px' }} choices={images} resettable />
      <NumberInput
        label="priorytet"
        source="priority"
        helperText="Priorytet na liście, od najmniejszego, 0 - nie wyświetlaj"
      />
    </SimpleForm>
  </Edit>
)
