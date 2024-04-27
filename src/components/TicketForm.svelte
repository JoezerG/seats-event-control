<script>
  import { currentReserve } from "../stores/reserve";

  function handleInputChange(evt) {
    const value = evt.currentTarget.value;
    const name = evt.currentTarget.id;
    currentReserve.set({ ...$currentReserve, [name]: value });
    console.log($currentReserve);
  }
</script>

<div id="form-data" class="column">
  <h2 class="title">Datos del asistente</h2>
  <div class="field">
    <div class="control">
      <label>Nombre y Apellido</label>
      <input
        id="fullName"
        class="input"
        required
        type="text"
        placeholder="Alicia Perez"
        on:change={handleInputChange}
        bind:value={$currentReserve.fullName}
      />
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label>Cedula</label>
      <input
        required
        id="citizenId"
        class="input"
        type="text"
        placeholder="XXXXXXXXXX"
        bind:value={$currentReserve.citizenId}
        on:change={handleInputChange}
      />
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label> Correo electronico </label>
      <input
        required
        id="email"
        class="input"
        type="email"
        placeholder="example@mail.com"
        bind:value={$currentReserve.email}
        on:change={handleInputChange}
      />
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label>Celular</label>
      <input
        required
        id="cellphone"
        class="input"
        type="tel"
        placeholder=""
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        bind:value={$currentReserve.cellphone}
        on:change={handleInputChange}
      />
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label>Fecha de nacimiento</label>
      <input
        required
        id="birthday"
        class="input"
        type="date"
        bind:value={$currentReserve.birthday}
        on:change={handleInputChange}
      />
    </div>
  </div>
  <div class="field is-grouped">
    <div class="field">
      <label>Tipo de pago</label>
      <div class="control">
        <div class="select">
          <select
            id="paymentType"
            bind:value={$currentReserve.paymentType}
            on:change={handleInputChange}
          >
            <option></option>
            <option value="total-payment">Pago completo</option>
            <option value="first-payment">Primer Abono</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label>Metodo de pago</label>
      <div class="control">
        <div class="select">
          <select
            id="paymentMethod"
            bind:value={$currentReserve.paymentMethod}
            on:change={handleInputChange}
          >
            <option></option>
            <option value="cash">Efectivo</option>
            <option value="transfer">Transferencia</option>
            <option value="digital">Punto de venta</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>
