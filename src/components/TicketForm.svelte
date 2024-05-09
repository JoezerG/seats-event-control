<script lang="ts">
  import { currentSeat } from "../stores/reserve";

  let currentReserve: Record<string, any> = {};
  let fullName = "";
  let citizenId = "";
  let cellphone = "";
  let tshirtSize = "";
  let paymentType = "";
  let paymentMethod = "";

  let saving = false;
  enum RESULT_TYPE {
    SUCCESS,
    ERROR,
    INFO,
  }
  let resultType: RESULT_TYPE = RESULT_TYPE.SUCCESS;
  let resultMsg = "";

  async function handleSaveReserve() {
    saving = true;
    resultMsg = "Guardando";
    const request = await fetch("/api/reserve", {
      method: "POST",
      body: JSON.stringify({
        fullName,
        citizenId,
        cellphone,
        tshirtSize,
        paymentMethod,
        paymentType,
        ...$currentSeat,
      }),
    });

    const result = await request.json();
    if (result.isError) {
      resultType = RESULT_TYPE.ERROR;
    }

    resultMsg = result.msg;
    currentReserve = {};
    setTimeout(() => {
      saving = false;
      fullName = "";
      citizenId = "";
      cellphone = "";
      tshirtSize = "";
      paymentType = "";
      paymentMethod = "";
      location.reload();
    }, 5000);
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
        bind:value={fullName}
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
        bind:value={citizenId}
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
        bind:value={cellphone}
      />
    </div>
  </div>
  <div class="field">
    <label>Talla camiseta</label>
    <div class="control is-expanded">
      <div class="select is-fullwidth">
        <select id="tshirtSize" bind:value={tshirtSize}>
          <option></option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="2XL">2XL</option>
        </select>
      </div>
    </div>
  </div>
  <div class="field-body">
    <div class="field">
      <label>Tipo de pago</label>
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select id="paymentType" bind:value={paymentType}>
            <option></option>
            <option value="total-payment">Pago completo</option>
            <option value="first-payment">Primer Abono</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label>Metodo de pago</label>
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select id="paymentMethod" bind:value={paymentMethod}>
            <option></option>
            <option value="cash">Efectivo</option>
            <option value="transfer">Transferencia</option>
            <option value="digital">Datafono</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="column">
  {#if currentReserve}
    <div class="card">
      <div class="card-content">
        <p class="title">Reserva para {fullName}</p>
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <th>Cedula</th>
              <td>{citizenId}</td>
            </tr>
            <tr>
              <th>Celular</th>
              <td>{cellphone}</td>
            </tr>
            <tr>
              <th>Pago</th>
              <td>
                {paymentType
                  ? paymentType === "total-payment"
                    ? "Pagado"
                    : "Abonado"
                  : ""}
              </td>
            </tr>
            <tr>
              <th>Talla camiseta</th>
              <td>{tshirtSize}</td>
            </tr>
            <tr>
              <th>Asiento seleccionado</th>
              <td>
                {#if $currentSeat.seatZone && $currentSeat.seatNumber}
                  <b>Zona:</b>
                  {$currentSeat.seatZone} <b>Asiento:</b>
                  {$currentSeat.seatNumber}
                {/if}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button on:click={handleSaveReserve} class="button is-primary">
      Guardar Reserva
    </button>
  {/if}
  {#if saving}
    <div
      class={[
        "notification",
        `${resultType === RESULT_TYPE.SUCCESS && "is-success"}`,
        `${resultType === RESULT_TYPE.ERROR && "is-danger"}`,
      ].join(" ")}
    >
      {resultMsg}
    </div>
  {/if}
</div>

<style>
  .notification {
    margin-top: 2rem;
  }
</style>
