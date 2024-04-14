import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileComponent } from './profile.component'; 

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    const mockData = {
        avatar_url: 'https://example.com/avatar.jpg',
        name: 'John Doe',
        bio: 'This is the bio of John Doe.',
        location: 'San Francisco, CA',
        twitter_username: 'johndoe',
        blog: 'https://johndoe.com',
        email: 'john.doe@example.com',
        html_url: 'https://github.com/johndoe'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            schemas: [NO_ERRORS_SCHEMA] 
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        component.data = mockData;
        fixture.detectChanges();
    });

    it('should render profile picture', () => {
        const imageElement = fixture.debugElement.query(By.css('img'));
        expect(imageElement.attributes['src']).toEqual(mockData.avatar_url);
        expect(imageElement.attributes['alt']).toEqual('Profile Picture');
    });

    it('should render name correctly', () => {
        if (mockData.name) {
            const nameElement = fixture.debugElement.query(By.css('h1'));
            expect(nameElement.nativeElement.textContent).toEqual(mockData.name);
        }
    });

    it('should render bio correctly', () => {
        const bioElement = fixture.debugElement.query(By.css('.text-lg.text-gray-700'));
        expect(bioElement.nativeElement.textContent).toEqual(mockData.bio);
    });

    it('should render location correctly', () => {
        if (mockData.location) {
            const locationElement = fixture.debugElement.query(By.css('.flex p'));
            expect(locationElement.nativeElement.textContent.trim()).toEqual(mockData.location);
        }
    });

    it('should render social media links correctly', () => {
        if (mockData.twitter_username) {
            const twitterLink = fixture.debugElement.query(By.css('a[href*="twitter.com"]'));
            expect(twitterLink.attributes['href']).toContain(mockData.twitter_username);
        }

        if (mockData.blog) {
            const blogLink = fixture.debugElement.query(By.css('a[href*="johndoe.com"]'));
            expect(blogLink.attributes['href']).toContain(mockData.blog);
        }

        if (mockData.email) {
            const emailLink = fixture.debugElement.query(By.css('a[href^="mailto:"]'));
            expect(emailLink.attributes['href']).toEqual(`mailto:${mockData.email}`);
        }

        if (mockData.html_url) {
            const githubLink = fixture.debugElement.query(By.css('a[href*="github.com"]'));
            expect(githubLink.attributes['href']).toEqual(mockData.html_url);
        }
    });
});
