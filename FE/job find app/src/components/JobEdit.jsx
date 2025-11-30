import { useState } from "react";
import axios from "axios";

export default function JobEdit({ onChange }) {
  // UPDATE FORM
  const [updateForm, setUpdateForm] = useState({
    id: "",
    title: "",
    desc: "",
    minSalary: "",
    maxSalary: "",
    location: "",
  });

  // DELETE FORM
  const [deleteId, setDeleteId] = useState("");

  // HANDLE UPDATE
  const handleUpdate = async () => {
    if (!updateForm.id) {
      alert("Vui lòng nhập Job ID để cập nhật");
      return;
    }

    await axios.put(`http://localhost:3000/jobs/${updateForm.id}`, {
    title: updateForm.title,
    description: updateForm.desc,
    minSalary: updateForm.minSalary,
    maxSalary: updateForm.maxSalary,
    location: updateForm.location
});


    alert("Cập nhật thành công!");

    onChange(); // 🔥 thông báo App reload JobList

    window.location.reload();

    // 🔥 RESET FORM → ép React rerender UI
    setUpdateForm({
      id: "",
      title: "",
      desc: "",
      minSalary: "",
      maxSalary: "",
      location: "",
    });
  };

  // HANDLE DELETE
  const handleDelete = async () => {
    if (!deleteId) {
      alert("Vui lòng nhập Job ID để xoá");
      return;
    }

    await axios.delete(`http://localhost:3000/jobs/${deleteId}`);

    alert("Xoá thành công!");

    onChange(); // 🔥 reload JobList

    window.location.reload(); 

    setDeleteId("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update / Delete Job</h1>

      {/* UPDATE FORM */}
      <h2 style={{ marginTop: "30px" }}>Update Job</h2>

      <input
        placeholder="Job ID"
        value={updateForm.id}
        onChange={(e) =>
          setUpdateForm({ ...updateForm, id: e.target.value })
        }
      />
      <br /><br />

      <input
        placeholder="New Job Title"
        value={updateForm.title}
        onChange={(e) =>
          setUpdateForm({ ...updateForm, title: e.target.value })
        }
      />
      <br /><br />

      <textarea
        placeholder="New Description"
        value={updateForm.desc}
        onChange={(e) =>
          setUpdateForm({ ...updateForm, desc: e.target.value })
        }
      />
      <br /><br />

      <input
        placeholder="New Min Salary"
        value={updateForm.minSalary}
        onChange={(e) =>
          setUpdateForm({ ...updateForm, minSalary: e.target.value })
        }
      />
      <br /><br />

      <input
        placeholder="New Max Salary"
        value={updateForm.maxSalary}
        onChange={(e) =>
          setUpdateForm({ ...updateForm, maxSalary: e.target.value })
        }
      />
      <br /><br />

      <input
        placeholder="New Location"
        value={updateForm.location}
        onChange={(e) =>
          setUpdateForm({ ...updateForm, location: e.target.value })
        }
      />
      <br /><br />

      <button onClick={handleUpdate}>Update Job</button>

      <hr style={{ margin: "40px 0" }} />

      {/* DELETE FORM */}
      <h2>Delete Job</h2>

      <input
        placeholder="Job ID"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
      />
      <br /><br />

      <button 
        style={{ background: "red", color: "white" }} 
        onClick={handleDelete}
      >
        Delete Job
      </button>
    </div>
  );
}
