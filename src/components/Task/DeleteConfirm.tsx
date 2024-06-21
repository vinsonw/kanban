import Button from "../Button/Button";
import "./DeleteConfirm.scss";

interface Props {
  onDelete: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

const DeleteConfirm = ({ onDelete, onCancel, title, description }: Props) => {
  return (
    <div className="delete-confirm-wrapper">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="buttons">
        <Button onClick={onDelete} type="danger" size="small" label="Delete" />
        <Button
          onClick={onCancel}
          type="secondary"
          size="small"
          label="Cancel"
        />
      </div>
    </div>
  );
};

export default DeleteConfirm;
