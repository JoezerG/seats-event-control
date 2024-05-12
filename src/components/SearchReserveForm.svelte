<script lang="ts">
  import { DateTime } from "luxon";
  import SeatsGrid from "./SeatsGrid.svelte";
  import { currentSeat } from "../stores/reserve";
  let citizenId = "";
  let reserve;
  let payments = [];
  let editMode: false;
  let saving = false;

  export let reserved = [];
  const PaymentsTypes = {
    "first-payment": "Primer Abono",
    "final-payment": "Ultimo Abono",
    "total-payment": "Pago completo",
  };

  const PaymentsMethods = {
    cash: "Efectivo 💵",
    transfer: "Tranferencia 💳",
    digital: "Datafono",
  };

  async function searchReservation() {
    try {
      const result = await fetch(`/api/reserve/${citizenId}`);
      const data = await result.json();
      reserve = data.reserve;
      payments = data.payments;
    } catch (error) {
      alert("Reverva no encontrada");
    }
  }

  async function updateSeats() {
    saving = true;
    reserve.seatZone = $currentSeat.seatZone;
    reserve.seatNumber = $currentSeat.seatNumber;
    const result = await fetch(`/api/reserve/${citizenId}`, {
      method: "PUT",
      body: JSON.stringify({
        citizenId,
        seatZone: $currentSeat.seatZone,
        seatNumber: $currentSeat.seatNumber,
      }),
    });

    const data = await result.json();
    saving = false;
    editMode = false;
    currentSeat.set({});
    await searchReservation();
  }

  async function addPayment() {
    const result = await fetch(`/api/reserve/payments`, {
      method: "POST",
      body: JSON.stringify({
        citizenId,
        paymentMethod: "cash",
        paymentType: "final-payment",
      }),
    });
    const data = await result.json();
    currentSeat.set({});
    await searchReservation();
  }
</script>

<div class="columns">
  <div class="column">
    <div class="field">
      <div class="control">
        <label>Introduzca la cedula</label>
        <input
          id="citizen-id"
          class="input"
          type="text"
          bind:value={citizenId}
        />
      </div>
    </div>
    <div class="field">
      <button on:click={searchReservation} class="button is-primary">
        Buscar reserva
      </button>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <div class="card-header">
        <h4 class="title card-header-title">Reserva</h4>
      </div>
      <div class="card-content">
        {#if reserve}
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <th>Nombre y Apellido</th>
                <td colspan="2">{reserve?.fullName}</td>
              </tr>
              <tr>
                <th>Cedula</th>
                <td colspan="2">{reserve?.citizenId}</td>
              </tr>
              <tr>
                <th>Celular</th>
                <td colspan="2">{reserve?.cellphone}</td>
              </tr>
              <tr>
                <th>Talla camiseta</th>
                <td colspan="2">{reserve?.tshirtSize}</td>
              </tr>
              <tr>
                <th>Asiento seleccionado</th>
                <td>
                  Zone:
                  {reserve?.seatZone}

                  Asiento:
                  {reserve.seatNumber}
                </td>
                <td>
                  {#if editMode}
                    <button
                      disabled={saving}
                      on:click={updateSeats}
                      class="button is-primary"
                    >
                      Guardar
                    </button>
                  {:else}
                    <button
                      on:click={() => (editMode = true)}
                      class="button is-danger"
                    >
                      Editar
                    </button>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Reservado el</th>
                <td colspan="2">
                  {DateTime.fromISO(reserve?.reservedAt).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </td>
              </tr>
              <tr>
                <th>Pagos</th>
                <td>
                  <div class="content">
                    <ul>
                      {#each payments as { paidAt, paymentType, paymentMethod }}
                        <li>
                          <b
                            >{DateTime.fromISO(paidAt).toLocaleString(
                              DateTime.DATE_MED
                            )}</b
                          >
                          <br />
                          {PaymentsTypes[paymentType]}
                          <br />
                          {PaymentsMethods[paymentMethod]}
                        </li>
                      {/each}
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        {/if}
      </div>
      <div class="card-footer">
        <div class="card-footer-item">
          {#if reserve}
            {#if !payments?.some((p) => p.paymentType === "total-payment" || p.paymentType === "final-payment")}
              <button
                on:click={addPayment}
                id="set-last-payment"
                class="button is-primary"
              >
                Abonar Ultimo Pago
              </button>
            {:else}
              Pagado ✅
            {/if}
          {/if}
        </div>
        <!-- <div class="card-footer-item">
          {#if reserve?.redeemed}
            Kit entregado ✅
          {:else}
            <button
              id="set-redeeme-kit"
              class="button is-primary"
              disabled={!payments?.some(
                (p) =>
                  p.paymentType === "total-payment" ||
                  p.paymentType === "final-payment"
              )}
            >
              Entregar Kit
            </button>
          {/if}
        </div> -->
      </div>
    </div>
  </div>
</div>
{#if editMode}
  <SeatsGrid {reserved} />
{/if}
