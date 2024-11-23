import styles from "./Table.module.css";
import PropTypes from "prop-types";

function Table({ data, setOffset }) {
  return (
    <div className={styles.table}>
      <div className={styles.tableRow}>
        <h3>Id</h3>
        <h3>First name</h3>
        <h3>Last name</h3>
        <h3>Age</h3>
        <h3>Class</h3>
      </div>
      <div>
        {data?.map((child, index) => {
          return (
            <div key={index} className={styles.tableRow}>
              <p>{child?.id}</p>
              <p>{child?.fname}</p>
              <p>{child?.lname}</p>
              <p>{child?.age}</p>
              <p>{child?.class}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => {
            setOffset((prev) => (prev === 0 ? prev : prev - 1));
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            setOffset((prev) => prev + 1);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Table;

Table.propTypes = {
  data: PropTypes.array,
  setOffset: PropTypes.func,
};
