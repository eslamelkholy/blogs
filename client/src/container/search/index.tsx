import { useEffect, useState } from 'react';
import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SegmentTypesPage from './segmentType';
import { defaultPaginationDto } from '../../util/pagination';
import { SEARCH_USERS } from '../../GraphQL/Queries/search';
import { useQuery } from '@apollo/client';
import { UserType } from './types';
import { InputWrapper, Label, Listbox, Root, StyledTag } from './style';

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

export function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

export default function SearchPage() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [],
    multiple: true,
    options: userData,
    getOptionLabel: (option) => option.email,
  });
  const [segmentType, setSegmentType] = useState('');
  const { error, loading, data, refetch } = useQuery(SEARCH_USERS, {
    variables: { pageOptionDto: { take: defaultPaginationDto.take, page: defaultPaginationDto.page }, email: getInputProps().value },
  });

  useEffect(() => {
    if (!error && data) setUserData(data.userSearch.entities);
  }, [data, error, loading]);

  console.log(value, getInputProps().value);

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Customized hook</Label>
        <SegmentTypesPage setSegmentType={setSegmentType} segmentType={segmentType} />
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: UserType, index: number) => (
            <StyledTag label={option.email} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()} style={{ position: 'relative' }}>
          {(groupedOptions as UserType[]).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.email}</span>
              <CheckIcon fontSize='small' />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
