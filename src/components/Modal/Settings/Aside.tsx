import styled from "styled-components";

const AsideWrap = styled.aside`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`
const AsideTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
`
const AsideList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const ListItem = styled.li`
  padding: 5px 10px;
  background: ${({theme}) => theme.colors.bgGrey};
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: ${({theme}) => theme.colors.bgGreyHover};
  }
`

const Aside = () => {
    return (
        <AsideWrap>
            <AsideTitle>
                Добавить на карточку
            </AsideTitle>
            <AsideList>
                <ListItem>
                    Участники
                </ListItem>
                <ListItem>
                    Метки
                </ListItem>
                <ListItem>
                    Даты
                </ListItem>
            </AsideList>
        </AsideWrap>
    )
}

export default Aside