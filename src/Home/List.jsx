import { TbPointFilled } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
const List = ({ data }) => {
  return (
    <>
      <tr>
        <td>
          <TbPointFilled />
        </td>
        <td>{data.name}</td>
        <td>{data.status}</td>
        <td>{data.priority}</td>
        <td>
          <HiDotsHorizontal />
        </td>
      </tr>
    </>
  );
};

export default List;
