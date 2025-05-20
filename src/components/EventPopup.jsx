import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

const EventPopup = ({ event, onSave, onDelete, onClose, isSunday }) => {
  const [title, setTitle] = useState(event?.title ?? "");
  const [start, setStart] = useState(event?.start ?? new Date());
  const [end, setEnd] = useState(event?.end ?? new Date());
  const [type, setType] = useState(event?.type ?? "TASK");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      setEnd(event.end);
      setType(event.type);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title?.trim()) validationErrors.title = "Please enter event name";
    if (start >= end)
      validationErrors.date = "Start time cannot be later than end time";

    if (Object.keys(validationErrors)?.length) {
      setErrors(validationErrors);
      return;
    }

    onSave({ ...event, title, start, end, type });
    onClose();
  };

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  return (
    <div className="popupOverlay">
      <div className="popup">
        <form onSubmit={handleSubmit}>
          <div className="newEvent">
            <label>Event Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSunday}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="newEvent">
            <label>Event Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isSunday}
            >
              <option value="TASK">Task</option>
              <option value="HOLIDAY">Holiday</option>
            </select>
          </div>

          <div className="newEvent">
            <label>Start Time</label>
            <input
              type="datetime-local"
              value={format(start, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setStart(parseISO(e.target.value))}
              disabled={isSunday}
            />
          </div>

          <div className="newEvent">
            <label>End Time</label>
            <input
              type="datetime-local"
              value={format(end, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setEnd(parseISO(e.target?.value))}
              disabled={isSunday}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          <div className="popup-btns">
            {event?.id && (
              <button type="button" className="delete" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save" disabled={isSunday}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventPopup;
