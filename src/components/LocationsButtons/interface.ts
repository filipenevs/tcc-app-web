export interface LocationsButtonsProps {
  locationType: 'Estado' | 'Cidade' | 'Bairro'
  isEditing: boolean
  onClickDelete: React.MouseEventHandler<HTMLButtonElement>
  onClickEdit: React.MouseEventHandler<HTMLButtonElement>
  onClickCancel: React.MouseEventHandler<HTMLButtonElement>
  onClickSave: React.MouseEventHandler<HTMLButtonElement>
}
