import { useState } from 'react'
import { AutocompleteInput } from 'react-admin'

const locations = ['Sala Główna', 'Sala 1', 'Sala 2', 'Sala 3', 'Stołówka'].map(
  (name) => ({ id: name, name }),
)

const LocationInput = ({ ...props }) => {
  const [locationsOptions, setLocationsOptions] = useState(locations)

  return (
    <AutocompleteInput
      source="location"
      label="lokalizacja"
      style={{ width: '256px' }}
      choices={locationsOptions}
      resettable
      onCreate={() => {
        try {
          // eslint-disable-next-line no-undef
          const newOption = prompt('Inna lokalizacja')
          setLocationsOptions([...locationsOptions, { id: newOption, name: newOption }])
          // eslint-disable-next-line no-empty
        } catch {}
      }}
      {...props}
    />
  )
}

export default LocationInput
