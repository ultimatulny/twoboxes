import { COLORS } from "../../../shared/consts";
import styles from "./Menu.module.css";

interface IProps {
  handleSelectColor: (colorId: string) => void;
  isMagnited: boolean;
  handleDemagnetize: () => void;
}

export const Menu = ({
  handleSelectColor,
  isMagnited,
  handleDemagnetize,
}: IProps) => {
  return (
    <>
      <div className={styles.menu}>
        <h1>Выбери цвет</h1>
        <div className={styles.colors}>
          {Object.entries(COLORS).map((color) => (
            <div
              key={color[0]}
              style={{
                backgroundColor: color[1].backgroundColor,
                border: `2px solid ${color[1].borderColor}`,
              }}
              className={styles.color}
              onClick={() => handleSelectColor(color[0])}
            />
          ))}
        </div>
        {isMagnited && (
          <button className={styles.button} onClick={handleDemagnetize}>
            Разъединить
          </button>
        )}
      </div>
    </>
  );
};
