# QrewmatesCli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Testing
Tests to be done

+ Odczytanie regulaminu
+ Wyświetlanie wszysktich kategorii w menu poziomym
+ Wyświetlanie wszystkich kategorii w menu poziomym (tytuły + opis)
+ Wyświetlenie poprawnych atrybutów produktu na liście produktów:
    + nazwa
    + opis
    + cena

+ Wyświetlenie poprawnych szczegółów produktu
    + opcje
    + nazwa
    + cena
    + opis
    + opcje
    + dodatki

+ Poprawne obliczanie ceny po aktualizacji
    + opcji
    + select
    + topping
    + ilości produktów

+ [CLI] Dodanie jednego prostego produktu do koszyka
    + Wyświetlenie prawidłowego podsumowania
        + lista wszystkich elementów
        + poprawna cena
        + sprawdzenie przywracania zamówienia z cache

+ [CLI] Dodanie jednego złożonego produktu do koszyka
    + Wyświetlenie prawidłowego podsumowania
        + lista wszystkich elementów
        + poprawna cena
        + komentarz
        + sprawdzenie przywracania zamówienia z cache

+ [CLI] Dodanie jednego wielu produktów do koszyka
    + Obwódka na karcie produktu i wyświetlenie poprawnej ilości
    + Wyświetlenie prawidłowego podsumowania
        + lista wszystkich elementów
        + rozdzielenie elementów z wybraną ilością na kolejne pozycje na liście
        + poprawna cena
        + komentarz
        + sprawdzenie przywracania zamówienia z cache

- [CLI|STAFF] Edycja produktu (sprawdzenie poprawności aktualizacji ceny, zamówienia, komentarza, podsumowania)
    + dodanie topping
    + dodanie select
    + usunięcie topping
    + usunięcie select
    + zmiana opcji (test usunięcia wszystkich toppings i selects)
    + Usunięcie produktu z zamówienia
    + Zmiana ilości produktów w zamówieniu
    + Zmiana komentarza

- [STAFF] Wyświetlenie wszystkich kategorii zamówień
- [STAFF] Wyświetlenie posortowanych zamówień 
- [STAFF] Wyświetlenie nowego zamówienia po akcji klienta (CREATE, UPDATE)
- [STAFF] Skasowanie zamówienia po akcji klienta (DELETE)
- [STAFF] Aktualizacja zamówienia po akcji kelnera (UPDATE)

+ Wyświetlenie dokumentu "O nas"
+ Wyświetlenie dokumentu "Polityka prywatności"
+ Wyświetlenie dokumentu "Informacja prawna"
+ Wyświetlenie dokumentu "Jak to działa?"
+ Przechodzenie przez wszystkie statusy zamówienia
+ Odczyt komentarza do odrzuconego zamówienia
+ Odczyt komentarza do anulowanego zamówienia


## Stories
### User
+ Użytkownik może przeczytać załączony dokument w formacie PDF:
    + O nas
    + Polityka prywatności
    + Informacja prawna 
    + Jak to działa?
+ Użytkownik może wyświetlić menu restauracji
+ Użytkownik może skompletować zamówienie zawierające
    + Dania
    + Dodatki
    + Opcje
    + Komentarz
+ Użytkownik może złożyć zamówienia
+ Użytkownik zostanie poinformowany o przyjęciu (lub nieprzyjęciu) zamówienia
- Użytkownik może wyświetlić dodatkowe informacje o restauracji:
    - Czas obsługi zamówienia
    - Godziny otwarcia
- Użytkownik zostanie poinformowany kiedy restauracja nie przyjmuje zamówień

### Kelner
- Kelner może się zalogować
- Kelner może się wylogować
- Kelner może wyświetlić listę aktywnych zamówień (niezakończonych)
- Kelner może edytować zamówienie
- Kelner może przyjąć zamówienie
- Kelner może zmienić status zamówienia
- Kelner może odrzucić zamówienie
- Kelner może dodać komentarz do odrzucanego zamówienia
- Kelner może zobaczyć szczegóły zamówienia

### Admin
- Admin może się zalogować
- Admin może się wylogować
- Admin ma dostęp do statystyk:
    - Wartość przedaży z podziałem na dni
    ...
- Admin może wyświetlić listę zamówień (niezakończonych)
- Admin może wyświetlić listę zamówień (zakończonych)
- Admin może edytować konfigurację restauracji
    - Logo
    - Zdjęcie w tle
    - Kolorystyka
    - Informacje (jakie??)
        - Godziny otwarcia
    - Admin może "wyłączyć restaurację"
- Admin może edytować kategorie restauracji
- Admin może edytować dania restauracji
- Admin może edytować dodatki restauracji
- Admin może edytować alergeny
- Admin może dodawać/edytować kelnerów i innych administratorów