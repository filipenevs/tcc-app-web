export interface LocationsButtonsProps {
  locationType: 'Estado' | 'Cidade' | 'Bairro'
  onClickDelete: React.MouseEventHandler<HTMLButtonElement>
  onClickEdit: React.MouseEventHandler<HTMLButtonElement>
}
