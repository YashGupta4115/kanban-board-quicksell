import { useContext, useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";
import { PriorityList, statusList } from "../../Assests/grids";
import { ConContext } from "../../Context/ContextProvider";

const AddTask = ({ groupedTasks, groupKey, setGroupedTasks }) => {
  const { tasks, handleAddTask } = useContext(ConContext);
  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    tag: "",
    userId: "",
    status: "",
    priority: "",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refs = {
    id: useRef(null),
    title: useRef(null),
    tag: useRef(null),
    userId: useRef(null),
    status: useRef(null),
    priority: useRef(null),
  };

  useEffect(() => {
    const handleAutofill = () => {
      setFormValues({
        id: refs.id.current?.value || "",
        title: refs.title.current?.value || "",
        tag: refs.tag.current?.value || "",
        userId: refs.userId.current?.value || "",
        status: refs.status.current?.value || "",
        priority: refs.priority.current?.value || "",
      });
    };
    Object.values(refs).forEach((ref) =>
      ref.current?.addEventListener("change", handleAutofill)
    );

    return () => {
      Object.values(refs).forEach((ref) =>
        ref.current?.removeEventListener("change", handleAutofill)
      );
    };
  }, [refs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (values) => {
    const isValid =
      values.title.trim() &&
      values.tag.trim() &&
      values.userId.trim() &&
      values.status.trim() &&
      values.priority.trim();
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm(formValues);
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newTask = {
      id: formValues.id || "CAM-" + (tasks?.length + 1) || 1,
      title: formValues.title,
      userId: formValues.userId,
      status: formValues.status,
      priority: formValues.priority,
      tag: [formValues.tag],
    };

    handleAddTask(newTask);
  };

  return (
    <div className="formSection">
      <div className="form-container">
        <span className="form-msg1">Add new Task!</span>
      </div>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <div className="titleInput-container form-indi-containers">
            Task Title:
            <input
              className="form-inputs"
              type="text"
              name="title"
              placeholder="Title"
              value={formValues.title}
              onChange={handleInputChange}
              ref={refs.title}
              required
            />
          </div>

          <div className="tag-input-container form-indi-containers">
            Tag:
            <input
              className="form-inputs"
              type="text"
              name="tag"
              placeholder="Set tag"
              value={formValues.tag}
              onChange={handleInputChange}
              ref={refs.tag}
              required
            />
          </div>

          <div className="userId-input-container form-indi-containers">
            User ID:
            <input
              className="form-inputs"
              type="text"
              name="userId"
              placeholder="Set User ID"
              value={formValues.userId}
              onChange={handleInputChange}
              ref={refs.userId}
              required
            />
          </div>

          <div className="status-input-container form-indi-containers">
            Status:
            <DropDown
              list={statusList}
              DropDownTitle={"Select one"}
              onChange={(status) =>
                setFormValues((prev) => ({ ...prev, status }))
              }
            />
          </div>

          <div className="priority-input-container form-indi-containers">
            Priority:
            <DropDown
              list={PriorityList}
              DropDownTitle={"Priority"}
              onChange={(priority) =>
                setFormValues((prev) => ({ ...prev, priority }))
              }
            />
          </div>

          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default AddTask;
