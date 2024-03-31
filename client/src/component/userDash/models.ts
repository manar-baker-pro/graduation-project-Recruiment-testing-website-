export interface UserInterface {
  id: string;
  username: string;
  email: string;
  isConfirmedAccount: boolean;
}
export interface UserComponent {
  itemName: string;
  itemIcon: any;
}
export interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}
