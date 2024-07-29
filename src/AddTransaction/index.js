import { Component } from "react";

import { FiSave } from "react-icons/fi";

import { RxCross2 } from "react-icons/rx";

import { TailSpin } from "react-loader-spinner";

import "./index.css";
import axios from "axios";

class AddTransaction extends Component {
  state = {
    isLoading: false,
    transactionType: "credit",
    amount: "",
    description: "",
  };

  onChangeType = (e) => {
    this.setState({ transactionType: e.target.value });
  };

  onChangeAmount = (e) => {
    this.setState({ amount: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  addTransaction = async () => {
    const { transactionType, amount, description } = this.state;
    const newTrans = {
      transactionType,
      amount,
      description,
    };

    await axios
      .post(
        "https://artists-backend-assignment-production.up.railway.app/add-transaction",
        newTrans
      )
      .then((res) => {
        alert(res.data.msg);
        this.setState({ isLoading: false });
        const { history } = this.props;
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
        this.setState({ isLoading: false });
      });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { amount, description } = this.state;
    if (!amount || !description) {
      alert("amount and desccription fields are required");
    } else if (isNaN(amount) || parceInt(amount) < 0) {
      alert("please enter valid amount, must be positive integer");
    } else {
      this.setState({ isLoading: true }, this.addTransaction);
    }
  };

  onClickCancel = () => {
    const { history } = this.props;
    history.replace("/");
  };

  render() {
    const { transactionType, amount, description, isLoading } = this.state;
    return (
      <div className="add-trans-main-container">
        {isLoading ? (
          <div>
            <TailSpin
              height="50"
              width="50"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="card-container">
            <h1 className="new-heading">New Transaction</h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <label htmlFor="type">Transaction Type</label>
                <select
                  onChange={this.onChangeType}
                  className="select"
                  name="type"
                  id="type"
                  value={transactionType}
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="amount">Amount</label>
                <input
                  onChange={this.onChangeAmount}
                  className="amount-input"
                  placeholder="Enter Amount"
                  type="text"
                  id="amount"
                  value={amount}
                />
              </div>
              <div className="input-container-textarea">
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={this.onChangeDescription}
                  placeholder="Enter Description"
                  className="textarea-el"
                  id="description"
                  value={description}
                ></textarea>
              </div>
              <div className="btns-container">
                <button type="submit" className="save-btn">
                  <FiSave />
                  Save
                </button>
                <button onClick={this.onClickCancel} className="cancel-btn">
                  <RxCross2 />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddTransaction;
