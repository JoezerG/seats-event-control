<script lang="ts">
  import { currentReserve } from "../stores/reserve";
  let saving = false;
  enum RESULT_TYPE {
    SUCCESS,
    ERROR,
    INFO,
  }
  let resultType: RESULT_TYPE = RESULT_TYPE.SUCCESS;
  let resultMsg = "";

  const reserveKeys = Object.keys($currentReserve);
  const isntReady =
    reserveKeys.length > 0
      ? Object.keys($currentReserve).some((v) => v === undefined)
      : true;

  async function handleSaveReserve() {
    saving = true;
    resultMsg = "Guardando";
    const request = await fetch("/api/reserve", {
      method: "POST",
      body: JSON.stringify($currentReserve),
    });

    const result = await request.json();
    if (result.isError) {
      resultType = RESULT_TYPE.ERROR;
    }

    resultMsg = result.msg;
    currentReserve.set({});
    setTimeout(() => {
      saving = false;
    }, 10000);
  }
</script>

<div class="column">
  {#if $currentReserve}
    <div class="card">
      <div class="card-content">
        <p class="title">Reserva para {$currentReserve.fullName || ""}</p>
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <th>Cedula:</th>
              <td>{$currentReserve.citizenId || ""}</td>
            </tr>
            <tr>
              <th>Correo electronico:</th>
              <td>{$currentReserve.email || ""}</td>
            </tr>
            <tr>
              <th>Celular:</th>
              <td>{$currentReserve.cellphone || ""}</td>
            </tr>
            <tr>
              <th>Pago</th>
              <td>
                {$currentReserve.paymentType
                  ? $currentReserve.paymentType === "total-payment"
                    ? "Pagado"
                    : "Abonado"
                  : ""}
              </td>
            </tr>
            <tr>
              <th>Asiento seleccionado:</th>
              <td>
                {#if $currentReserve.seatZone && $currentReserve.seatNumber}
                  <b>Zona:</b>
                  {$currentReserve.seatZone} <b>Asiento:</b>
                  {$currentReserve.seatNumber}
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
