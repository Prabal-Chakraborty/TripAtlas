import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DESTINATIONS, Destination } from '../../data/destinations';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  userData: any = null;
  loading = true;
  errorMessage = '';

  allDestinations: Destination[] = DESTINATIONS;
  filteredDestinations: Destination[] = [];

  countries: string[] = [];
  states: string[] = [];
  categories: string[] = ['Beach', 'Mountain', 'Monument'];

  filterForm = this.fb.group({
    country: [''],
    state: [''],
    category: ['']
  });

  ngOnInit(): void {
    this.fetchDashboard();
    this.initializeFilters();
    this.setupFilterListeners();
  }

  fetchDashboard(): void {
    this.authService.getDashboard().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.userData = res.data.user;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to load dashboard';

        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  initializeFilters(): void {
    this.countries = [...new Set(this.allDestinations.map(item => item.country))];
    this.filteredDestinations = [];
  }

  setupFilterListeners(): void {
    this.filterForm.get('country')?.valueChanges.subscribe((country) => {
      this.filterForm.patchValue(
        {
          state: '',
          category: this.filterForm.get('category')?.value || ''
        },
        { emitEvent: false }
      );

      this.updateStates(country || '');
      this.applyFilters();
    });

    this.filterForm.get('state')?.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.filterForm.get('category')?.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  updateStates(selectedCountry: string): void {
    if (!selectedCountry) {
      this.states = [];
      return;
    }

    this.states = [
      ...new Set(
        this.allDestinations
          .filter(item => item.country === selectedCountry)
          .map(item => item.state)
      )
    ];
  }

  applyFilters(): void {
    const country = this.filterForm.get('country')?.value || '';
    const state = this.filterForm.get('state')?.value || '';
    const category = this.filterForm.get('category')?.value || '';

    if (!country || !state) {
      this.filteredDestinations = [];
      return;
    }

    this.filteredDestinations = this.allDestinations.filter(item => {
      const countryMatch = item.country === country;
      const stateMatch = item.state === state;
      const categoryMatch = !category || item.category === category;

      return countryMatch && stateMatch && categoryMatch;
    });
  }

  clearFilters(): void {
    this.filterForm.reset({
      country: '',
      state: '',
      category: ''
    });

    this.states = [];
    this.filteredDestinations = [];
  }

  bookNow(id: number): void {
    this.router.navigate(['/tour', id]);
  }

  viewInMap(id: number): void {
    this.router.navigate(['/map', id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}