import React from "react";

const Delivery = ({
  formData,
  selectedState,
  selectedLga,
  handleStateChange,
  handleLgaChange,
  setFormData,
  state,
  lga,
}) => {
  const isFormComplete = () => {
    return (
      formData.name &&
      formData.phone &&
      selectedState &&
      selectedLga &&
      formData.address
    );
  };

  return (
    <div>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  className="form-control border-form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  // value={user.firstname}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  Phone <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border-form-control"
                  name="phone"
                  value={formData.number}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="form-group" onChange={handleStateChange}>
                <label className="control-label">
                  State <span className="required">*</span>
                </label>
                <select>
                  <option disabled selected>
                    -- Select State --
                  </option>
                  {state.map((states) => (
                    <option key={states.State} value={states.State}>
                      {states.State}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">
                  LGA <span className="required">*</span>
                </label>

                <select value={selectedLga} onChange={handleLgaChange}>
                  <option disabled selected>
                    -- Select Lga --
                  </option>
                  {lga.map((local) => (
                    <option key={local} value={local}>
                      {local}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">
                  Shipping Address <span className="required">*</span>
                </label>
                <textarea
                  className="form-control border-form-control"
                  name="address"
                  value={formData.address}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <small className="text-danger">
                  Please provide the number and street Address.
                </small>
              </div>
            </div>
          </div>
          <button
            type="button"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
            className={`btn btn-secondary mb-2 btn-lg ${
              isFormComplete() ? "" : "disabled"
            }`}
          >
            NEXT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Delivery;
