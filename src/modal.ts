const overlay = () => document.getElementById('modal-overlay')!;
const box     = () => document.getElementById('modal-box')!;

export function showModal(html: string): void {
  box().innerHTML = html;
  overlay().classList.remove('hidden');
  overlay().classList.add('flex');
}

export function closeModal(): void {
  overlay().classList.add('hidden');
  overlay().classList.remove('flex');
  box().innerHTML = '';
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
  overlay().addEventListener('click', (e) => {
    if (e.target === overlay()) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
