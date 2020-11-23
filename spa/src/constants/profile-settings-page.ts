interface ISideBarState {
  entries: {
    name: string,
    isSelected: boolean,
  }[],
}

export const SIDE_BAR: ISideBarState = {
  entries: [
    {
      name: 'Редактирование профиля',
      isSelected: true,
    },
    {
      name: 'Сменить пароль',
      isSelected: false,
    }
  ]
}

export const PPS_TEXT = {
  change_photo: 'Сменить фото профиля'
}
