// Init qSel
const qSel = q => document.querySelector( q );

class GitHub {
    constructor( ) {
        this.client_id          = '9c01631a564f0501cd24';
        this.client_secret      = '3fa659e81d1c67e1fb39df5c8c22abbdddc1b9ed';
        this.repos_sort         = 'created: asc';
        this.repos_count        = 5;
    }

    async getUser( user ) {
        // Profile
        const profileResponse   = await fetch( `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}` );
        // Repos
        const repoResponse      = await fetch( `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}` );

        const profile           = await profileResponse.json( );
        const repos             = await repoResponse.json( );

        return {
            profile,
            repos
        }
    }
}