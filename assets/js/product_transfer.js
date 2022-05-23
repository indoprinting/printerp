
class ProductTransfer {
  constructor(elm) {
    this._elm = document.querySelector(elm);
    this._tbody = null;
    this._lastValue = 0;
    this.mode = 'add';

    document.addEventListener('change', (e) => {
      if (e.target.matches('input.pt-quantity')) {
        if (parseFloat(e.target.value) > parseFloat(e.target.dataset.quantity)) {
          e.target.value = this._lastValue;
          toastr.error(`Tidak boleh lebih dari stok yang ada. Maksimum ${e.target.dataset.quantity}`);
          return false;
        }
  
        if (parseFloat(e.target.value) < 0 || (this._lastValue > 0 && parseFloat(e.target.value) == 0)) {
          e.target.value = this._lastValue;
          toastr.error('Tidak boleh ada stok kosong atau minus.');
          return false;
        }
      }
    })

    document.addEventListener('change', (e) => {
      if (e.target.matches('input.pt-quantity, input.markon_price')) {
        this.refresh();
      }
    });

    document.addEventListener('focus', (e) => {
      if (e.target.matches('input.pt-quantity, input.markon_price')) {
        this._lastValue = e.target.value;
      }
    }, true);
  }

  addItem(item) {
    if (item) {
      this._tbody = this._elm.querySelector('tbody');
      let tr = document.createElement('tr');

      tr.dataset.id = item.id;

      item.received_qty = (item.received_qty ?? 0); // Required or NaN.
      item.spec = (item.spec ?? '');

      tr.innerHTML = `
        <input type="hidden" name="product[id][]" value="${item.id}">`;

      if (this.mode == 'add' || this.mode == 'edit') { // Action
        tr.innerHTML += `<td class="text-center">
          <a href="#" data-toggle="delete-row" title="Delete ${item.name}">
            <i class="fad fa-trash" style="color:red"></i>
          </a>
        </td>`;
      } else {
        tr.innerHTML += '<td></td>';
      }

      tr.innerHTML += `
        <td>${item.code}</td>
        <td>${item.name}</td>
        <td><input class="form-control" name="product[spec][]" type="text" value="${item.spec}"></td>`;

      if (this.mode == 'add' || this.mode == 'edit') {
        tr.innerHTML += `
          <td><input class="form-control markon_price separator text-right" name="product[markon_price][]"
            type="text" value="${formatSeparator(item.markon_price)}"></td>`;
      }

      if (this.mode == 'edit' || this.mode == 'status') {
        let readonly = (this.mode == 'status' ? ' readonly' : '');

        tr.innerHTML += `
          <td><input class="form-control separator text-right" name="product[received_qty][]"
            type="text" value="${parseFloat(item.received_qty)}"${readonly}></td>`;
      }

      tr.innerHTML += `
        <td><input class="form-control pt-quantity separator text-right"
          name="product[quantity][]" data-quantity="${parseFloat(item.quantity)}"
          type="text" value="${formatSeparator(item.quantity - item.received_qty)}"></td>`;

      if (this.mode == 'add' || this.mode == 'edit') {
        tr.innerHTML += `
          <td class="text-right subtotal">${formatSeparator(item.markon_price * item.quantity)}</td>`;
      }

      this._tbody.appendChild(tr);
    }

    return this;
  }

  refresh() {
    if (this.mode == 'status') return false;

    let elmMarkon = this._tbody.querySelectorAll('.markon_price');
    let elmQty    = this._tbody.querySelectorAll('.pt-quantity');
    let elmSub    = this._tbody.querySelectorAll('.subtotal');
    let subTotal   = 0;
    let grandTotal = 0;

    for (let a = 0; a < elmSub.length; a++) {
      if (!elmMarkon[a].value.length) elmMarkon[a].value = 0;
      if (!elmQty[a].value.length)    elmQty[a].value    = 0;

      subTotal = filterDecimal(elmMarkon[a].value) * filterDecimal(elmQty[a].value);
      elmSub[a].innerHTML = formatSeparator(subTotal);
      grandTotal += subTotal;
    }

    this._tbody.closest('table').querySelector('.grand_total').innerHTML = formatSeparator(grandTotal);

    return true;
  }

  setMode(mode) {
    this.mode = mode;
    return this;
  }
}
